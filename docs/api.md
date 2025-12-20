# API 定義

## 認証について

認証・認可は行わない

## 形式

入力: `application/json` <br />
出力:

- 成功時: `application/json`
- エラー時: `application/problem+json`

出力形式は以下の型を基本とする。エラー時のフォーマットは RFC9457 を参考にする。

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

## お題生成

`POST /api/topics/generate`

### 概要

- お題の生成を行う

### 入力

なし

### 出力

```ts
interface TopicResponse {
  topic: string;
  word: string;
}
```

## お題推測

`POST /api/guess`

### 概要

プレイヤーが描いたイラストとトピックを入力として、元のお題を推測する API

### 仕様

- `Content-Type`: `multipart/form-data`
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

```ts
interface GuessResponse {
  guessWord: string;
}
```

## エラー定義

- `VALIDATION_ERROR`
- `INVALID_IMAGE_FORMAT`
- `FILE_TOO_LARGE`
- `INTERNAL_SERVER_ERROR`
- `TOPIC_GENERATION_ERROR`
- `GUESS_ERROR`
- `LLM_NOT_AUTHORIZED`
- `LLM_CONNECTION_FAILED`
- `LLM_RATE_LIMIT_EXCEEDED`
- `LLM_QUOTA_EXCEEDED`
- `LLM_RESPONSE_INVALID`
- `LLM_TIMEOUT`

### `VALIDATION_ERROR`

コード: 400

入力データが不正

### `INVALID_IMAGE_FORMAT`

コード: 400

画像フォーマットが正しくない

### `FILE_TOO_LARGE`

コード: 400

ファイルサイズが大きすぎる

### `INTERNAL_SERVER_ERROR`

コード: 500

エラーコードが存在しないその他の処理エラー

### `TOPIC_GENERATION_ERROR`

コード: 500

お題生成中のエラー

### `GUESS_ERROR`

コード: 500

お題推測中のエラー

### `LLM_NOT_AUTHORIZED`

コード: 403

### `LLM_CONNECTION_FAILED`

コード: 503

LLM API への接続に失敗した場合

### `LLM_RATE_LIMIT_EXCEEDED`

コード: 429

LLM API のレート制限を超過した場合

### `LLM_QUOTA_EXCEEDED`

コード: 503

LLM API の使用制限を超えた場合

### `LLM_RESPONSE_INVALID`

コード: 500

LLM からのレスポンスが解析不能の場合

### `LLM_TIMEOUT`

コード: 504

LLM へのリクエストがタイムアウトした場合