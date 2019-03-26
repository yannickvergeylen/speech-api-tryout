import {Component} from '@angular/core';
import * as brain from 'brain.js'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public samples: Array<{ buffer: AudioBuffer, result?: string }> = [];
  public neural = new brain.NeuralNetwork();

  public addToSamples(buffer: AudioBuffer) {
    this.samples.push({buffer,result:'other'});
  }

  public updateSamples(samples){
    this.samples = [...samples];
    console.log(this.samples);
  }

  public trainOnSamples(){
    const trainData = this.samples.map(({buffer,result}) => ({input:buffer.getChannelData(0),output:{[result]:1}}));
    const test = trainData.pop();
    this.neural.train(trainData);
    this.neural.run(test);
  }
}
