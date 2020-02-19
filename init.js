import app from "./app";

const PORT = 4000;

const handleListening = () =>
  console.log(`✅ Listening on: http://localhost:${PORT}`);

app.listen(PORT, handleListening); //생성된 서버가 port를 바라보게 한다.
