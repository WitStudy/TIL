# DockerコンテナからホストのMySQLに接続する

MySQLのコンテナを別途作成し、そこに接続する方法もあるが、

ホストのMySQLを使用したくなった場合の手順を残しておく。

## 環境

* ホスト
  * windows 8.1
  * mysql  Ver 14.14 Distrib 5.6.36, for Win64 (x86_64)
  * Docker Toolbox version 18.02.0-ce
* Dockerホスト
  * Boot2Docker 18.09.5
  * Client: Docker Engine - Community 18.09.5
  * Server: Docker Engine - Community 18.09.5
* Dockerコンテナ
  * CentOS Linux release 7.6.1810 (Core)
  * mysql  Ver 15.1 Distrib 5.5.60-MariaDB, for Linux (x86_64) using readline 5.1

## 手順

1. DockerコンテナからホストへPING

    ```
    # ping <host ipaddress> -c 4
    PING <host ipaddress> (<host ipaddress>) 56(84) bytes of data.
    64 bytes from <host ipaddress>: icmp_seq=1 ttl=126 time=0.427 ms
    64 bytes from <host ipaddress>: icmp_seq=2 ttl=126 time=1.24 ms
    64 bytes from <host ipaddress>: icmp_seq=3 ttl=126 time=1.20 ms
    64 bytes from <host ipaddress>: icmp_seq=4 ttl=126 time=1.31 ms

    --- <host ipaddress> ping statistics ---
    4 packets transmitted, 4 received, 0% packet loss, time 3065ms
    rtt min/avg/max/mdev = 0.427/1.045/1.310/0.359 ms
    ```

    PINGは問題なし

1. DockerコンテナからホストのMySQLに接続

    ```
    # mysql -u root -p -h <host ipaddress>
    Enter password:
    ERROR 1130 (HY000): Host 'xxxxx' is not allowed to connect to this MySQL server
    ```

    接続できない

1. ホストのMySQLのユーザを確認

    ```
    mysql> select user, host from mysql.user;
    +--------+-----------------+
    | user   | host            |
    +--------+-----------------+
    | root   | 127.0.0.1       |
    | root   | ::1             |
    | root   | localhost       |
    +--------+-----------------+
    3 rows in set (0.00 sec)
    ```

1. Dockerコンテナからの接続用ユーザを作成

    ```
    mysql> grant all privileges on *.* to docker@"<host_ipaddress>" identified by 'docker';
    Query OK, 0 rows affected (0.00 sec)

    mysql> FLUSH PRIVILEGES;
    Query OK, 0 rows affected (0.00 sec)
    ```

1. DockerコンテナからホストのMySQLに接続

    ```
    # mysql -u docker -p -h <host_ipaddress>
    Enter password:
    Welcome to the MariaDB monitor.  Commands end with ; or \g.
    Your MySQL connection id is 13
    Server version: 5.6.36-log MySQL Community Server (GPL)

    Copyright (c) 2000, 2018, Oracle, MariaDB Corporation Ab and others.

    Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

    MySQL [(none)]>
    ```

    接続成功
