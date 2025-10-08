import {Editor, MarkdownView, Plugin} from 'obsidian';

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
				// highlight
				const selectedText = editor.getSelection();
				const highlighted = `==${selectedText}==`;
				editor.replaceSelection(highlighted);

				// add block id to end line
				const cursor = editor.getCursor(); 
				const line = editor.getLine(cursor.line);
				const blockId = Math.random().toString(36).substring(2, 8);
				if (!/\^[-\w]+$/.test(line)) {
					editor.setLine(cursor.line, `${line} ^${blockId}`);
				}

				// copy to clipboard
				const file = this.app.workspace.getActiveFile();
				const fileLink = `[[${file?.path}#^${blockId}|${file?.basename}]]`;
				await navigator.clipboard.writeText(fileLink);
			}
		});
	}

	async onunload() {

	}
}
