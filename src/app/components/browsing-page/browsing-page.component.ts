import { Component, OnInit, ViewChild } from '@angular/core';
import { Dropbox, files } from 'dropbox';
import {MatMenu, MatMenuTrigger} from '@angular/material/menu';
import * as _ from 'lodash';
import { FileService } from '../../services/dropbox-file.service';
import { BrowsingLink } from '../../models/browsing-routing-types';
import { QuickAccessName } from '../../models/browsing-page-types';


@Component({
  selector: 'browsing-page',
  templateUrl: './browsing-page.component.html',
})
export class BrowsingPageComponent {
  public files: files.MetadataReference[] = [] as files.MetadataReference[];

  public folders: files.MetadataReference[] = [] as files.MetadataReference[];

  public deleted: files.MetadataReference[] = [] as files.MetadataReference[];

  public path: BrowsingLink = { current: '', previous: {} as BrowsingLink, fileName: "" };

  public prevPath: string = '';

  public paths: BrowsingLink[] = [] as BrowsingLink[];

  public quickAccessNames: QuickAccessName[] = [] as QuickAccessName[];

  constructor(private fileService: FileService) {}

  public menuPosition = {x: '0', y: '0'}

  downloadRecord(name: string) {
    var url = this.path.current + "/" + name;
    console.log(url);
    this.fileService.downloadRecord(url);
  }

  uploadFile(file: File, name: string) {
    
  }

  folderClicked(name: string) {
      let newLink: BrowsingLink = {
        current: this.path.current + '/' + name,
        previous: this.path,
        fileName: name
      };

      this.paths.push(newLink);

      this.path = newLink;

      this.fileService.load(this.path.current);

      this.files = this.fileService.getFiles();

      this.folders = this.fileService.getFolders();

      this.deleted = this.fileService.getDeleted();

      this.quickAccessNames = this.fileService.getNames();
  }

  backClicked() {
    this.path = this.path.previous;

    this.fileService.load(this.path.current);

    this.files = this.fileService.getFiles();

    this.folders = this.fileService.getFolders();

    this.deleted = this.fileService.getDeleted();

    this.quickAccessNames = this.fileService.getNames();
  }

  handleQuickAccessMouseEnter(item: QuickAccessName) {
    item.hovered = true;
  }

  handleQuickAccessMouseLeave(item: QuickAccessName) {
    item.hovered = false;
  }

  handleQuickAccessClicked(item: QuickAccessName) {
    if (item.tag === 'folder') {
      this.folderClicked(item.full);
    } 
    else {
        this.downloadRecord(item.full);
    }
  }

  routeElementClicked(name: string) {
    let found = false;

    console.log(name);

    while (!found) {
      if (this.paths[this.paths.length - 1].current == name) {
        found = true;
        this.path = this.paths[this.paths.length - 1];
      } else {
        this.paths.pop();
        if (this.paths.length === 0) {
          this.path = { current: '', previous: {} as BrowsingLink, fileName: "" };
          found = true;
        }
      }
    }

    this.fileService.load(this.path.current);

    this.files = this.fileService.getFiles();

    this.folders = this.fileService.getFolders();

    this.deleted = this.fileService.getDeleted();

    this.quickAccessNames = this.fileService.getNames();
  }

  ngOnInit() {
    this.files = this.fileService.getFiles();
    this.folders = this.fileService.getFolders();
    this.deleted = this.fileService.getDeleted();
    this.quickAccessNames = this.fileService.getNames();
  }
}
