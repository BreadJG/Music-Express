const http = require('http');

const hostname = 'Localhost';
const port = 3000;

const express = require('express');
const app = express();

const albums = require('./app');
const { indexOf } = require('./app');

const server = http.createServer(app);

app.get('/', (req, res) => {
    const homePage = `
    <h1>Panic! at the Disco</h1>
    <p>Panic! at the Disco is an American rock band that originated in Las Vegas, Nevada.</p>
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Panic%21attheDiscoatBarclaysCenter2013.jpg/440px-Panic%21attheDiscoatBarclaysCenter2013.jpg"> </img>
    <h2> Members </h2>
    <ul>
        <li>Brendon Urie</li>
        <li>Ryan Ross</li>
        <li>Spencer Smith</li>
        <li>Brent Wilson</li>
        <li>Jon Walker</li>
        <li>Dallon Weekes</li>
    </ul> 
    <a href= "${req.path}cds"> View Albums</a>`
    res.send(homePage);
});

app.get('/cds', (req, res) => {
    for (let i=0; i<albums.length; i++) {
        let album = albums[i];
        let albumList = ``
        albumList += `
            <h1>Panic! at the Disco</h1>
            <h2>Albums</h2>`
        albumList += `<ul>`;
        for(let album of albums){
            albumList += `<a href="${req.path}/${albums.indexOf(album)}"><li>${album.name}</li></a>`}
        albumList += `
            </ul>`;
        res.send(albumList);
    }
    
});

app.get('/cds/:index', (req,res) =>{
    const {index} = req.params;
    const album = albums[index];
    let albumInfo = ``;
        albumInfo += `<h1>${album.name} (${album.publishDate})</h1>`
        albumInfo += `<img src=${album.imgURL} </img>`
        albumInfo += '<h2>Songs</h2>'
        for (let i = 0; i < album.songTitles.length; i++) {
            albumInfo += `<li>${album.songTitles[i]}</li>`
        }
        albumInfo += `<a href="http://${hostname}:${port}/cds">Back to Albums</a>`
    res.send(albumInfo)
})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
