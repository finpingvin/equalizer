import React from 'react';
import { connect } from 'react-redux';
import { selectFrequencyBins, setFrequencyBins } from './equalizerSlice';
import styles from  './Equalizer.module.css';

class AudioPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.audioEl = React.createRef();

    this.peek = this.peek.bind(this);
    this.startAnalyzing = this.startAnalyzing.bind(this);
  }

  startAnalyzing() {
    const context = new AudioContext();
    const src = context.createMediaElementSource(this.audioEl.current);
    this.analyzer = context.createAnalyser();
    src.connect(this.analyzer);
    this.analyzer.connect(context.destination);
    //this.analyzer.fftSize = 16384;
    this.analyzer.fftSize = 64;

    const bufferLength = this.analyzer.frequencyBinCount;
    this.dataArray = new Uint8Array(bufferLength);

    this.startPeeking();
  }

  componentWillUnmount() {
    this.stopPeeking();
  }

  stopPeeking () {
    window.cancelAnimationFrame(this.peekId);
  }

  startPeeking () {
    this.peek();
  }

  peek () {
    this.analyzer.getByteFrequencyData(this.dataArray);
    // WARNIN: This is so unoptimized!!
    this.props.onSample(Array.from(this.dataArray));
    this.peekId = window.requestAnimationFrame(this.peek);
  }
  
  render() {
    return (
      <audio ref={this.audioEl} src={this.props.src} onPlay={this.startAnalyzing} controls></audio>
    );
  }
}

function Visualization({ frequencyBins }) {
  const bars = frequencyBins.map((f, binIdx) => {
    return (<div key={binIdx} className={styles.equalizer__frequency_bin} style={{ height: ((f / 255) * 100) + '%' }}></div>);
  });

  return (
    <div className={styles.equalizer}>
      {bars}
    </div>
  );
}

function Equalizer({ audioFile, frequencyBins, setFrequencyBins }) {
  return (
    <div>
      <Visualization frequencyBins={frequencyBins}/>
      <AudioPlayer src={audioFile} onSample={setFrequencyBins}/>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    frequencyBins: selectFrequencyBins(state)
  }
};

const mapDispatchToProps = {
  setFrequencyBins
}

export default connect(mapStateToProps, mapDispatchToProps)(Equalizer);