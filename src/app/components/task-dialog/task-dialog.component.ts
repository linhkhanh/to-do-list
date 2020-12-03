import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Task } from '../../Service/task';
import { TaskDialogData } from '../../Service/taskDialogData';

import * as _ from 'lodash';
@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.css'],
})
export class TaskDialogComponent {
  imageError: string;
  isImageSaved: boolean;
  imageURL: string;
  templateImage = this.data.task.image? this.data.task.image : "../assets/imgs/placeholder-image.png";
  private backupTask: Partial<Task> = { ...this.data.task }

  constructor(
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TaskDialogData
  ) { }

  cancel(): void {
    this.data.task.title = this.backupTask.title;
    this.data.task.description = this.backupTask.description;
    this.dialogRef.close(this.data);
  }
 
  fileChangeEvent(fileInput: any) {
    this.imageError = null;
    if (fileInput.target.files && fileInput.target.files[0]) {

      // Size Filter Bytes
      const max_size = 1048487; // FireStore doesn't allow to upload image with size > 1048487 bytes
      const allowed_types = ['image/png', 'image/jpeg']; 
      const max_height = 15200;
      const max_width = 25600;

      // Check file size
      if (fileInput.target.files[0].size > max_size) {
        this.imageError =
          'Maximum size allowed is ' + max_size + ' Bytes';
        return false;
      }

      // Check file type
      if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
        this.imageError = 'Only Images are allowed ( JPG | PNG )';
        return false;
      }

      // Read file
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          const img_height = rs.currentTarget['height'];
          const img_width = rs.currentTarget['width'];

          console.log(img_height, img_width);

          // Check width and height of image
          if (img_height > max_height && img_width > max_width) {
            this.imageError =
              'Maximum dimentions allowed ' +
              max_height +
              '*' +
              max_width +
              'px';
            return false;
          } else {
            const imgBase64Path = e.target.result;
            this.imageURL = imgBase64Path;
            this.isImageSaved = true; // show Remove Button

            // add to this string to field image
            this.data.task.image = this.imageURL
          }
        };
      };

      reader.readAsDataURL(fileInput.target.files[0]);

    }
  }

  removeImage() {
    this.imageURL = null;
    this.isImageSaved = false;
    this.data.task.image = null;
    this.templateImage = "../assets/imgs/placeholder-image.png"
  }
}



