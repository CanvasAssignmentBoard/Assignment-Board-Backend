import request from "supertest";
import express, {Request, Response, NextFunction, Application, ErrorRequestHandler} from 'express'
import {Express} from 'express-serve-static-core';
import app from "../src/app"
import {Server} from 'http'

let server: Server

describe('APP should say "Hello World!"', () => {
  beforeAll(() => {
    server = app;
  });

  afterAll(() => {
    server.close();
  })

  it('should return 200',  (done) => {
    request(server)
      .get('/')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body).toMatchObject({'message': `Hello World!`})
        done()
      })
  });

  it('should return 404', (done) => {
    request(server)
      .get("iwanterror")
      .expect(404)
      .end((err, res) => {
        done()
      })
  })
});