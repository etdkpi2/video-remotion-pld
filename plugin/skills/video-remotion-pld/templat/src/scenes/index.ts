import type React from 'react';
import {Scene1} from './Scene1';
import {Scene2} from './Scene2';
import {Scene3} from './Scene3';

/** Urutan harus sama dengan urutan "scenes" di src/data/video.json. */
export const SCENE_COMPONENTS: React.FC[] = [Scene1, Scene2, Scene3];
