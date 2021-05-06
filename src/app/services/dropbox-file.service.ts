import { Injectable } from "@angular/core";
import * as _ from "lodash";
import {Dropbox, files} from "dropbox";
import { QuickAccessName } from "../models/browsing-page-types";
import {saveAs} from 'file-saver';

@Injectable()
export class FileService {
    private allRecords: files.MetadataReference[] = [] as files.MetadataReference[];

    private files: files.MetadataReference[] = [] as files.MetadataReference[];

    private folders: files.MetadataReference[] = [] as files.MetadataReference[];

    private deleted: files.MetadataReference[] = [] as files.MetadataReference[];

    private quickAccessNames: QuickAccessName[] = [] as QuickAccessName[];



    constructor() {
        this.load("");
    }

    load(path: string) {

        this.allRecords = [] as files.MetadataReference[];
        this.files = [] as files.MetadataReference[];
        this.folders = [] as files.MetadataReference[];
        this.deleted = [] as files.MetadataReference[];
        this.quickAccessNames = [] as QuickAccessName[];

        let fetch;

        try {
            fetch = require('node-fetch');
        }
        catch(Exception) {
            fetch = window.fetch.bind(window);
        }

        var ACCESS_TOKEN = "Aw-EL8ffB3cAAAAAAAAAAVb0vDnQMTTlF7JB0asBSTes0nLyfHC18RXUsAQN-W_W";
        
        var dbx = new Dropbox( {accessToken: ACCESS_TOKEN});

        dbx.filesListFolder({path: path})
            .then(res => {
                this.allRecords = res.result.entries;
                this.allRecords.forEach(record => {
                    if(record[".tag"] === "file")
                    {
                        this.files.push(record);
                        this.quickAccessNames.push({short: record.name.substring(0,10), full: record.name, hovered: false, tag: "file"});
                    }
                    else if(record[".tag"] === "folder")
                    {
                        this.folders.push(record);
                        this.quickAccessNames.push({short: record.name.substring(0,10), full: record.name, hovered: false, tag: "folder"});
                    }
                    else if(record[".tag"] === "deleted")
                    {
                        this.deleted.push(record);
                    }

                })
            }
        )
    }

    getFiles() {
        return this.files;
    }

    getFolders() {
        return this.folders;
    }
    getDeleted() {
        return this.deleted;
    }
    getNames() {
        return this.quickAccessNames;
    }

    downloadRecord(path: string) {

        var ACCESS_TOKEN = "Aw-EL8ffB3cAAAAAAAAAAVb0vDnQMTTlF7JB0asBSTes0nLyfHC18RXUsAQN-W_W";
        
        var dbx = new Dropbox( {accessToken: ACCESS_TOKEN} );

        dbx.filesDownload({path: (path)})
        .then(function(data: any) {
            console.log(data);
            
            saveAs(data.result.fileBlob, path);
        });
    }

    uploadFile(path: string,name: string, file: File) {
        var ACCESS_TOKEN = "Aw-EL8ffB3cAAAAAAAAAAVb0vDnQMTTlF7JB0asBSTes0nLyfHC18RXUsAQN-W_W";
        
        var dbx = new Dropbox( {accessToken: ACCESS_TOKEN} );

        dbx.filesUpload({path: path + "/" + name, contents: file});
    }
}