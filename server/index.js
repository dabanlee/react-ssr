import fs from 'fs';
import path from 'path';
import express from 'express';

import React from 'react';
import { StaticRouter, matchPath } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import App from '../src/App';
import routes from '../src/routes';

const app = express();

app.get('/*', (req, res) => {
    const currentRoute = routes.find(route => matchPath(req.url, route)) || {};
    const context = {};
    const renderedString = renderToString(
        <StaticRouter location={req.url}>
            <App></App>
        </StaticRouter>
    );

    fs.readFile(path.resolve('index.html'), 'utf8', (error, data) => {
        if (error) {
            res.send(`<p>Server Error</p>`);
            return false;
        }

        res.send(data.replace('<div id="root"></div>', `<div id="root">${renderedString}</div>`));
    })
});

app.listen(3000);
