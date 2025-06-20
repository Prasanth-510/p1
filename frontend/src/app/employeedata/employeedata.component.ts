import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-employeedata',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employeedata.component.html',
  styleUrl: './employeedata.component.css'
})

export class EmployeedataComponent {
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

}import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

