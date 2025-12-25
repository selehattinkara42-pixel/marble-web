'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

interface RichTextEditorProps {
    value?: string;
    onChange?: (content: string) => void;
    name?: string;
}

export default function RichTextEditor({ value = '', onChange, name }: RichTextEditorProps) {
    const [content, setContent] = useState(value);

    const handleChange = (newValue: string) => {
        setContent(newValue);
        if (onChange) {
            onChange(newValue);
        }
    };

    // Update internal state if external value changes (for edit mode)
    useEffect(() => {
        if (value && value !== content) {
            setContent(value);
        }
    }, [value]);

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image'],
            ['clean']
        ],
    };

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'indent',
        'link', 'image'
    ];

    return (
        <div className="bg-background text-foreground">
            <input type="hidden" name={name} value={content} />
            <ReactQuill
                theme="snow"
                value={content}
                onChange={handleChange}
                modules={modules}
                formats={formats}
                className="bg-background text-foreground rounded-md"
            />
            <style jsx global>{`
                .ql-toolbar {
                    background-color: white;
                    border-top-left-radius: 0.5rem;
                    border-top-right-radius: 0.5rem;
                    border-color: hsl(var(--border)) !important;
                }
                .ql-container {
                    border-bottom-left-radius: 0.5rem;
                    border-bottom-right-radius: 0.5rem;
                    border-color: hsl(var(--border)) !important;
                    background-color: white;
                    color: black;
                    min-height: 200px;
                }
                .ql-editor {
                    min-height: 200px;
                }
            `}</style>
        </div>
    );
}
