import { Workspace, Editor, MarkdownView, Plugin} from 'obsidian';

export default class ReferenceHighlight extends Plugin {

	async onload() {

		this.addCommand({
			id: 'highlight-reference-file',
			name: 'Copy the file link of the highlight',
			editorCallback: async (editor: Editor, _view: MarkdownView) => {
				const selectedText = editor.getSelection();
				editor.replaceSelection(`==${selectedText}==`);
				const file = this.app.workspace.getActiveFile();
				const fileLink = "[[" + file?.path + "|" + file?.basename + "]]";
				await navigator.clipboard.writeText(fileLink);
			}
		});


		this.addCommand({
			id: 'highlight-reference-block',
			name: 'Copy the block link of the highlight',
			editorCallback: async (editor: Editor, _view: MarkdownView) => {
				const selectedText = editor.getSelection();
				const blockId = Math.random().toString(36).substring(2, 8);
				const highlighted = `==${selectedText}== ^${blockId}`;
				editor.replaceSelection(highlighted);
				const file = this.app.workspace.getActiveFile();
				const fileLink = `[[${file?.path}#^${blockId}|${file?.basename}]]`;
				await navigator.clipboard.writeText(fileLink);
			}
		});
	}

	async onunload() {

	}
}
