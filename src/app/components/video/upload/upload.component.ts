import { switchMap } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { v4 as uuid } from "uuid";
import { last } from 'rxjs';
import { ClipService } from 'src/app/services/clip.service';
import { Clip } from 'src/app/models/clip';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  user: firebase.User | null = null;

  isDragOver: boolean = false;
  droppedFile: File | null = null; 

  uploadPercentage: number = 0;
  showPersentages: boolean = false;

  showAlert: boolean = false;
  alertMessage: string = "Uploading your video...";
  alertColor: string = "blue";
  onSubmition: boolean = false;

  isFormVisible: boolean = false;
  videoTitle: FormControl = new FormControl("", {
    validators: [
      Validators.required,
      Validators.min(5)
    ],
    nonNullable: true  
  })
  videoForm = new FormGroup({
    videoTitle: this.videoTitle
  });

  constructor(
    private fireStorage: AngularFireStorage,
    private authentication: AngularFireAuth,
    private clipService: ClipService
  ) {
    authentication.user.subscribe(user => this.user = user)
  }

  ngOnInit(): void {
  }

  dropFile(event: Event) {
    this.isDragOver = false;

    this.droppedFile = (event as DragEvent).dataTransfer?.files.item(0) ?? null;
  
    if(!this.droppedFile || this.droppedFile?.type !== "video/mp4") {
      return 
    }

    this.isFormVisible = true;
    this.videoTitle.setValue(this.droppedFile.name.replace(/\.[^/.]+$/, ""));
    console.log()
  }

  uploadFile() {
    this.alertMessage = "Uploading your video...";
    this.alertColor = "blue";
    this.showAlert = true;
    this.onSubmition = true;
    this.showPersentages = true;
    
    const randomFileName = uuid();
    const videoPath = `clips/${randomFileName}.mp4`;

    const fileUploadingProgress = this.fireStorage.upload(videoPath, this.droppedFile);
    const clipRef = this.fireStorage.ref(videoPath);

    fileUploadingProgress.percentageChanges().subscribe(percent => {
      this.uploadPercentage = percent as number / 100;
    });

    fileUploadingProgress.snapshotChanges().pipe(
      last(),
      switchMap(() => clipRef.getDownloadURL())
    ).subscribe({
      next: (url) => {
        this.alertMessage = "Successfully upload your video";
        this.alertColor = "green";
        this.onSubmition = false;
        this.showPersentages = false;

        const clip: Clip = {
          uid: this.user?.uid as string,
          title: this.videoTitle.value,
          displayName: this.user?.displayName as string,
          fileName: `${randomFileName}.mp4`,
          url 
        }

        this.clipService.createClip(clip);

        console.log(clip)
      },
      error: (error) => {
        this.alertMessage = "Something went wrong on uploading your video";
        this.alertColor = "red";
        this.onSubmition = false;
        this.showPersentages = false;
        console.error(error)
      }
    });
  }

}
