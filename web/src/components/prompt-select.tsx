import { useEffect, useState } from 'react';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { api } from '@/lib/axios';

interface Prompt {
	id: string,
	title: string,
	template: string,
}

interface PromptSelectProps {
	onPromptSelected: (template: string) => void
}

export function PromptSelect ({onPromptSelected}:PromptSelectProps) {
	const [prompts, setPrompts] = useState<Prompt[]>([])

	useEffect(() => {
		api.get('/prompts').then(({data}) => {
			setPrompts(data)
		})
	}, [])

	function handlePromptSelected (promptId: string) {
		const prompt = prompts?.find(prompt => prompt.id === promptId)

		if (prompt) {
			onPromptSelected(prompt?.template)
		}
	}

	return (
		<>
			<Label>Prompt</Label>
			<Select onValueChange={handlePromptSelected}>
				<SelectTrigger>
					<SelectValue placeholder="Selecione um prompt" />
				</SelectTrigger>

				<SelectContent>
					{prompts.map((prompt) => {
						return (
							<SelectItem key={prompt.id} value={prompt.id}>{prompt.title}</SelectItem>
						)
					})}
				</SelectContent>
			</Select>
		</>
	)
}