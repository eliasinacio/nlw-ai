# Upload.AI

## Descrição
Projeto realizado durante a NLW AI, da Rocketseat. 
Consiste em uma aplicação que recebe um vídeo qualquer e utiliza Inteligência Artificial para transcrevê-lo e sugere títulos e descrições com base no conteúdo.

## Tecnologias
- React + Typescript
- Radix UI
- Shadcn UI
- Tailwind CSS
- WebAssembly, ffmpeg.wasm
- Axios
- Fastify
- OpenAI
- Prisma

### Destaques:
#### Prisma ORM
Foi utilizado o prisma para mapear, organizar e armazenar dados como áudio e transcrição dos vídeos processados e os prompts para geração da resposta da IA.

#### Combo Radix UI + Shadcn UI + Tailwind CSS
O frontend foi rapidamente desenvolvido e de forma simples e direta. 
Com os componentes pré-feitos do Shadcn UI e estilização pronta do Tailwind o código fica limpo e simples.

#### WebAssembly + ffmpeg.wasm
WebAssembly é uma tecnologia que permite a execução de código binário em navegadores para executar tarefas que precisam de um processamento mais pesado.
ffmpeg.wasm é uma versão do FFmpeg compilada para WebAssembly que permite que trabalhemos diretamente com vídeo/áudio no front, sem necessidade de enviar para o backend processar.
Foram utilizados para converter os vídeos em áudio, para poupar processamento e diminuir o peso dos dados para o backend.
