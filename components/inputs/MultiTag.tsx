import React, { useState } from 'react';
interface Tag {
    id: string;
    value: string;
  }
  
const MyMultiTagInput: React.FC = () => {
const [tags, setTags] = useState<Tag[]>([]);
const [newTag, setNewTag] = useState('');

const handleTagAdd = () => {
    if (newTag.length === 0) {
    return;
    }
    setTags([...tags, { id: newTag, value: newTag }]);
    setNewTag('');
};

const handleTagRemove = (id: string) => {
    setTags(tags.filter((tag) => tag.id !== id));
};

return (
    <div className="relative">
    <div className="flex flex-wrap">
        {tags.map((tag) => (
        <div key={tag.id} className="bg-purple-main mr-2 mb-2 px-3 rounded-full h-8">
            <label className="text-white">
            {tag.value}
            </label>
            <button
            type="button"
            className="text-red-500 p-1 ml-2"
            onClick={() => handleTagRemove(tag.id)}
            >
            x
            </button>
        </div>
        ))}
        <input
        type="text"
        className="p-2 rounded-full"
        placeholder="Add a tag"
        value={newTag}
        onChange={(event) => setNewTag(event.target.value)}
        />
    </div>
    <button
        type="button"
        className="absolute top-0 right-0 mt-2 hover:bg-purple-main shadow-sm hover:shadow-black hover:first-letter:text-white shadow-transparent mr-2 p-2 rounded-full"
        onClick={handleTagAdd}
    >
        <label className='hover:cursor-pointer font-bold'>
            +
        </label>
    </button>
    </div>
);
};

export default MyMultiTagInput;