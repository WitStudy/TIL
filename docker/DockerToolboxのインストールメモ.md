# Docker Toolboxのインストールメモ

## 環境

* Windows7

## インストール内容

* Docker Toolbox

  ```
  18.03.0-ce
  ```

* docker version

  ```
  Client:
   Version:       18.03.0-ce
   API version:   1.37
   Go version:    go1.9.4
   Git commit:    0520e24302
   Built: Fri Mar 23 08:31:36 2018
   OS/Arch:       windows/amd64
   Experimental:  false
   Orchestrator:  swarm

  Server: Docker Engine - Community
   Engine:
    Version:      18.09.5
    API version:  1.39 (minimum version 1.12)
    Go version:   go1.10.8
    Git commit:   e8ff056dbc
    Built:        Thu Apr 11 04:50:00 2019
    OS/Arch:      linux/amd64
    Experimental: false
  ```

* docker-machine version

  ```
  docker-machine.exe version 0.14.0, build 89b8332
  ```

* docker-compose

  ```
  docker-compose version 1.20.1, build 5d8c71b2
  docker-py version: 3.1.4
  CPython version: 3.6.4
  OpenSSL version: OpenSSL 1.0.2k  26 Jan 2017
  ```

## インストーラダウンロード

https://docs.docker.com/toolbox/overview/#ready-to-get-started

## インストールメモ

* Welcome to the Docker Toolbox Setup Wizard

  * Help Docker improve Toolbox.

    dockerの改善に協力する

    * 任意選択

* Select Destination Location

  * folder

    インストール先フォルダ

    * 任意選択

* Select Components

  * Docker Compose for Windows

    複数のDockerコンテナを制御するために必要

    * 選択する

  * VirtualBox

    Dockerマシンを動かすために必要

    * 未インストールの場合、選択する

  * Kitematic for Windows (Alpha)

    GUIでDockerを利用可能

    * 任意選択

  * Git for Windows

    Dockerマシンを動かすために必要

    * 未インストールの場合、選択する

* Select Additional Tasks

  * Create a desktop shortcut

    デスクトップにショートカットを作成する

    * 任意選択

  * Add docker binaries to PATH

    環境変数を設定する

    * 選択する

  * Upgrade Boot2Docker VM

    dockerマシンをアップグレードする

    * 選択する

* Completing the Docker Toolbox Setup Wizard

  * View Shortcuts in File Explorer

    インストールウィザード終了後、スタートメニューフォルダを開く

    * 任意選択

