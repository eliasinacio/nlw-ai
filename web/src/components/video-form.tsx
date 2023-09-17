import { FileVideo, Upload } from 'lucide-react';
import { Separator } from './ui/separator';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { ChangeEvent, FormEvent, useMemo, useRef, useState } from 'react';

export function VideoForm() {
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const promptInputRef = useRef<HTMLTextAreaElement>(null)

  function handleChangeFile (event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.currentTarget

    if (!files) {
      return
    }

    setVideoFile(files[0])
  }

  function handleUploadVideo (event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const prompt = promptInputRef.current?.value

    if (!videoFile) {
      return
    }

     
  }

  // useMemo: Even if the state or component changes, this item will only change if the dependencies change
  const previewURL = useMemo(() => {
    if (videoFile) {
      return URL.createObjectURL(videoFile)
    }

    return null
  }, [videoFile])

  return (
    <form className="space-y-6">
      <label
        htmlFor="video"
        className="flex relative border rounded-md aspect-video cursor-pointer border-dashed text-sm flex-col items-center justify-center text-muted-foreground hover:bg-gray-400/10"
      >
        {previewURL ? (
          <video src={previewURL} controls={false} className='pointer-events-none absolute inset-0' />
        ) : (
          <>
            <FileVideo className="w-4 h-4 mb-1" />
            Carregar vídeo
          </>
        )}
      </label>

      <input type="file" id="video" accept="video/mp4" className="sr-only" onChange={handleChangeFile} />

      <Separator />

      <div className="space-y-2">
        <Label htmlFor="transcription-prompt">Prompt de transcrição</Label>
        <Textarea
          id="transcription-prompt"
          className="h-20 leading-relaxed resize-none"
          placeholder="Informe palavras chave do vídeo separadas por vírgula (,)."
        />
      </div>

      <Button type="submit" className="w-full">
        Carregar vídeo
        <Upload className="w-4 h-4 ml-2" />
      </Button>
    </form>
  )
}