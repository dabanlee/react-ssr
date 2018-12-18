import fs from 'fs';
import path from 'path';
import express from 'express';

import React from 'react';
import { StaticRouter, matchPath } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import App from '../src/App';
import routes from '../src/routes';

const app = express();

app.use(express.static('dist'));

app.get('/*', (req, res) => {
    const currentRoute = routes.find(route => matchPath(req.url, route)) || {};
    const promise = currentRoute.fetchData ? currentRoute.fetchData() : Promise.resolve(null);

    promise.then(data => {
        const context = {
            data,
        };

        const renderedString = renderToString(
            <StaticRouter context={context} location={req.url}>
                <App></App>
            </StaticRouter>
        );

        function template() {
            return `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <meta http-equiv="X-UA-Compatible" content="ie=edge">
                    <title>React Server Side Rendering</title>
                </head>
                <body>
                    <div id="root">${renderedString}</div>
                    <script>window.__ROUTE_DATA__ = ${JSON.stringify(data)}</script>
                    <script src="/app.js"></script>
                </body>
                </html>

            `;
        }

        res.send(template());
    }).catch(error => {
        console.log('server.catch', error);
    });
});

app.listen(3000);
