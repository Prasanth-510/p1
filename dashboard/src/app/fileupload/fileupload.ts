import { HttpClient } from '@angular/common/http';
import { Component, OnInit, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { getNgModuleById } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf, NgForOf, KeyValuePipe} from '@angular/common';


@Component({
  selector: 'app-fileupload',
  standalone: true,
  imports: [NgIf, NgForOf, HttpClientModule, KeyValuePipe],
  templateUrl: './fileupload.html',
  styleUrl: './fileupload.css'
})
export class Fileupload {
  selectedFile!: File;
  uploadedData: any[] = [];

  constructor(private http: HttpClient) {}

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadExcel() {
    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.http.post<any>('http://localhost:3001/upload', formData).subscribe({
      next: (res) => {
        alert('File uploaded successfully');
        this.fetchData();
      },
      error: (err) => {
        console.error(err);
        alert('Upload failed');
      },
    });
  }

  fetchData() {
    this.http.get<any[]>('http://localhost:3001/data').subscribe((data) => {
      this.uploadedData = data;
    });
  }

  ngOnInit() {
    this.fetchData();
  }
}