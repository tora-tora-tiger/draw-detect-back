# API 定義

## 認証について

認証・認可は行わない

## 形式

入力: `application/json` <br />
出力: `application/problem+json`

出力形式は以下の型を基本とする。エラー時のフォーマットはRFC9457を参考にする。

```ts
interface ApiResponse<T> {
    isSuccess: true;
    data: T;
} | {
    isSuccess: false;
    error: {
        type: string;
        title: string;
        status: number;
        detail: string;
        instance: string;
    };
}
```

##  お題生成

`POST /api/topics/generate`

### 概要

- お題の生成を行う

### 入力

なし

### 出力

- 200 ok

```ts
interface Topic {
    topic: string;
    word: string;
}
```

## お題推測

`POST /api/guess`

### 概要

プレイヤーが描いたイラストとトピックを入力として、元のお題を推測するAPI

### 仕様
- 受信形式: multipart/form-data
- 画像形式: PNG
<!-- - 最大ファイルサイズ -->

### 入力

```ts
interface GuessRequest {
    topic: string;
    image: File;
}
```

### 出力

- 200

```ts
interface GuessResponse {
    "guessWord": string;
}
```
