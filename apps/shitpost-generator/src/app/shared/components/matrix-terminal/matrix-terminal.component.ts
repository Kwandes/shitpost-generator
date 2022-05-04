import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { terminalCommands } from './terminal-commands.constant';

@Component({
  selector: 'shitpost-generator-matrix-terminal',
  templateUrl: './matrix-terminal.component.html',
  styleUrls: ['./matrix-terminal.component.css'],
})
export class MatrixTerminalComponent implements AfterViewInit, OnDestroy {
  // ======== Matrix CANVAS ========
  @ViewChild('fallingTextCanvas')
  canvas!: ElementRef<HTMLCanvasElement>;
  public context!: CanvasRenderingContext2D;

  // An array of text drops - one per column
  drops: number[] = [];
  matrix: string[] = [];
  fontSize = 10;

  matrixInterval!: NodeJS.Timer;
  framesPerSecond = 15; // FPS of the matrix text displayed on the canvas
  canvasDimensions: {
    width: number;
    height: number;
  } = {
    width: 0,
    height: 0,
  };

  // ======== Terminal ========
  terminalText = '...booting';
  terminalCmdInterval!: NodeJS.Timer;
  commandsPerMinute = 60; // actually is less since there is a random delay for each command
  currentCommandIndex = 0;
  currentCommands: string[] = [];
  maxDisplayedTerminalCommands = 16;

  /**
   * Initialize the canvas and its context.
   * Start the drawing cycle and start writing to the terminal
   */
  ngAfterViewInit(): void {
    if (this.canvas.nativeElement.getContext('2d') !== null) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.context = this.canvas.nativeElement.getContext('2d') as any;
    }

    //making the canvas full screencanvas
    this.calculateResolution();
    console.log(this.canvasDimensions);

    this.canvas.nativeElement.height = this.canvasDimensions.height;
    this.canvas.nativeElement.width = this.canvasDimensions.width;
    this.context.fillStyle = 'rgba(0, 0, 0, 1)';
    this.context.fillRect(
      0,
      0,
      this.canvas.nativeElement.width,
      this.canvas.nativeElement.height
    );

    //chinese characters - taken from the unicode charset
    const charList =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}';
    // const charList = '😈💩🤡👺😺🙊💖💯👋👌🤏🙏👀🐵🦄🍕';
    //converting the string into an array of single characters
    this.matrix = charList.split('');

    const columns = this.canvasDimensions.width / this.fontSize; //number of columns for the rain
    console.log('columns', columns);

    //x below is the x coordinate
    //1 = y co-ordinate of the drop(same for every drop initially)
    for (let x = 0; x < columns; x++) {
      this.drops.push(1);
    }
    console.log('drops Init', this.drops);

    // draws the design boxes on based frequecy (FPS). Only draws them if there is a change to draw
    this.matrixInterval = setInterval(() => {
      requestAnimationFrame(this.draw.bind(this));
    }, 1000 / this.framesPerSecond);

    this.writeTerminalCommands();
    this.terminalCmdInterval = setInterval(() => {
      this.writeTerminalCommands();
    }, 60000 / this.commandsPerMinute);
  }

  /**
   * Remove the intervals
   */
  ngOnDestroy(): void {
    clearInterval(this.matrixInterval);
    clearInterval(this.terminalCmdInterval);
  }

  /**
   * Adjust the canvas sizing to match the new screen dimensions
   */
  @HostListener('window:resize', ['$event'])
  handleWindowResize(): void {
    this.ngOnDestroy();
    this.ngAfterViewInit();
  }

  /**
   * Draw the characters on the canvas.
   */
  draw(): void {
    // Black BG for the canvas
    // Translucent BG to show trail

    // console.log(window.getComputedStyle(document.body).backgroundColor);
    this.context.fillStyle = 'rgba(0, 0, 0, 0.1)';
    this.context.fillRect(
      0,
      0,
      this.canvasDimensions.width,
      this.canvasDimensions.height
    );

    this.context.fillStyle = '#f4427d'; //green text
    this.context.font = this.fontSize + 'px arial';
    // Looping over drops
    for (let i = 0; i < this.drops.length; i++) {
      // Print a random character
      const text = this.matrix[Math.floor(Math.random() * this.matrix.length)];
      this.context.fillText(
        text,
        i * this.fontSize,
        this.drops[i] * this.fontSize
      );

      // Send the drop back to the top randomly after it has crossed the screen
      // Add randomness to the reset to make the drops scattered on the Y axis
      if (
        this.drops[i] * this.fontSize > this.canvasDimensions.height &&
        Math.random() > 0.975
      )
        this.drops[i] = 0;

      // Increment the Y coordinate to make the drop fall
      this.drops[i]++;
    }
  }

  /**
   * Calculcate what the resolution of the canvas should be.
   */
  calculateResolution(): void {
    this.canvasDimensions = {
      width: (window.innerWidth / 8) * 3 + 8, // the + X accounts for the padding
      height: (window.innerHeight / 5) * 2 + 8,
    };
  }

  /**
   * Adjusts this.terminalText to display new text to the terminal.
   */
  async writeTerminalCommands(): Promise<void> {
    // wait for up to a second to make the command input looks more "realistic"
    await new Promise((f) => setTimeout(f, Math.floor(Math.random() * 1000)));
    // check if there are still new commands to send
    if (this.currentCommandIndex >= terminalCommands.length) {
      this.currentCommandIndex = 0;
      // uncomment to reset the terminal after a full cycle
      // this.currentCommands = [
      //   terminalUserHandle + ' clear',
      //   terminalUserHandle,
      // ];
    } else {
      this.currentCommands.push(terminalCommands[this.currentCommandIndex]);
      this.currentCommandIndex++;
    }
    if (this.currentCommands.length > this.maxDisplayedTerminalCommands) {
      this.currentCommands.shift();
    }
    this.terminalText = this.currentCommands.join('\n');
  }
}
