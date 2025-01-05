import { Component, Input, ViewChild, ElementRef, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { icoursecontent } from '../../assets/model/icoursecontent';
import videojs from 'video.js';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrl: './video-player.component.css'
})
export class VideoPlayerComponent implements AfterViewInit, OnInit ,OnDestroy {


  @Input() currentVideo: icoursecontent | undefined;
  @ViewChild('videoPlayer', { static: false })
  videoPlayer!: ElementRef<HTMLVideoElement>;

  currentTime: string | undefined;
  bookmark: string = '';
  progress: number = 0;
  totalTime: number | undefined;
  currentVideoSource: string = '../../assets/course/StreetCafe3DSketch.mp4';

  setCurrentTime(data: any) {
    this.currentTime = data.target.currentTime;

  }
  ngOnInit(): void {
    this.totalTime = 0;
    this.currentTime = localStorage["lastTimeFrame"];
    let newSource ='../../assets/course/StreetCafe3DSketch.mp4';
    
  }
  
  ngAfterViewInit(): void {

  }
  ngOnDestroy(): void {
    if (this.videoPlayer) {
      // this.videoPlayer.nativeElement.; // Clean up player instance
    }
  }

  disableRightClick(event: MouseEvent): void {
    event.preventDefault();
  }
  disableContextMenu(event: MouseEvent): void {
    event.preventDefault(); // Prevent the context menu
    //alert('Right-click is disabled on this video.');
  }
  play() {
    const savedTime = localStorage.getItem('lastTimeFrame');
    if (savedTime) {
      this.videoPlayer.nativeElement.currentTime = parseFloat(savedTime);
    }
    this.videoPlayer.nativeElement.play();
  }

  start() {
    this.videoPlayer.nativeElement.currentTime = 0;
    this.videoPlayer.nativeElement.play();
  }

  onPause(): void {
    this.bookmark = this.videoPlayer.nativeElement.currentTime.toString();
    this.videoPlayer.nativeElement.pause();
    localStorage["lastTimeFrame"] = this.currentTime;

  }

  initializeVideo() {
    const video = this.videoPlayer.nativeElement;
    this.progress = 0;
    this.totalTime = video.duration;
  }

  updateProgressBar() {
    const video = this.videoPlayer.nativeElement;
    const progressPercent = (video.currentTime / video.duration) * 100;
    this.progress = progressPercent;
    this.totalTime = video.duration;
  }

  seekVideo(event: Event) {
    const input = event.target as HTMLInputElement;
    const video = this.videoPlayer.nativeElement;
    const seekTime = (input.valueAsNumber / 100) * video.duration;
    video.currentTime = seekTime;
  }

  togglePlayPause() {
    const video = this.videoPlayer.nativeElement;
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
    this.bookmark = video.currentTime.toString();
  }
  changeVideoSource(newSource: string) {
    this.currentVideoSource = newSource;

    // Reload the video after changing the source
    const videoElement = this.videoPlayer.nativeElement;
    videoElement.load();
    videoElement.play();
  }
}
