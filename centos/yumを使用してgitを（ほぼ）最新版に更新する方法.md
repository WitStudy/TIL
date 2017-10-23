# yumを使用してgitを（ほぼ）最新版に更新する方法

## 環境

|ソフトウェア|バージョン|
|---|---|
|OS|CentOS 6.9|
|yum|3.2.29|
|git|1.7.1|

## 手順

1. `$ sudo yum -y localinstall http://dl.fedoraproject.org/pub/epel/6/x86_64/epel-release-6-8.noarch.rpm`

1. `$ sudo wget http://wing-repo.net/wing/6/EL6.wing.repo -P /etc/yum.repos.d/`

1. `$ sudo yum -y --enablerepo=wing update git`

## 確認

`$ git --version`

    ⇒ `git version 2.14.1`
