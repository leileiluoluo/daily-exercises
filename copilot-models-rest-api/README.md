# Copilot Models REST API

## How to use?

### Get Available Models

```text
GET http://localhost:3001/v1/models

{
    "models": [
        "gpt-4.1",
        "gpt-5-mini",
        "gpt-5",
        "gpt-3.5-turbo",
        "gpt-4o-mini",
        "copilot-fast",
        "gpt-4",
        "gpt-4-0125-preview",
        "gpt-4o",
        "grok-code-fast-1",
        "gpt-5.1",
        "gpt-5.1-codex",
        "gpt-5.1-codex-mini",
        "gpt-5-codex",
        "claude-sonnet-4",
        "claude-sonnet-4.5",
        "claude-haiku-4.5",
        "gemini-3-pro-preview",
        "gemini-2.5-pro",
        "auto"
    ]
}
```

### Call Chat Completions API

```text
POST http://localhost:3001/v1/chat/completions

{
    "model": "gpt-4.1",
    "messages": [
        "Could you please provide me some sample code for Java Stream API?"
    ]
}

{
    "reply": "xxx",
    "model": "gpt-4.1"
}
```
