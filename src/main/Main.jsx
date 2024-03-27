import ReactMarkdown from "react-markdown";

const Main = ({ activeNote, onUpdateNote }) => {
  const onEditField = (field, value) => {
    onUpdateNote({
      ...activeNote,
      [field]: value,
      lastModified: Date.now(),
    });
  };

  const onUploadImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      onEditField("image", reader.result);
    };
    reader.readAsDataURL(file);
  };

  const onDeleteImage = () => {
    onEditField("image", "");
  };

  if (!activeNote) return <div className="no-active-note">select note or add new note</div>;

  return (
    <div className="app-main">
      <div className="app-main-note-edit">
        <input
          type="text"
          id="title"
          placeholder="Note Title"
          value={activeNote.title}
          onChange={(e) => onEditField("title", e.target.value)}
          autoFocus
        />
        <textarea
          id="body"
          placeholder="Write your note here..."
          value={activeNote.body}
          onChange={(e) => onEditField("body", e.target.value)}
        />
        <label htmlFor="image" className="add-image-button">Add Image</label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={onUploadImage}
          style={{display: 'none'}}
        />
        {activeNote.image && <button className="delete" onClick={onDeleteImage}>Delete Image</button>}
      </div>
      <div className="app-main-note-preview">
        <h1 className="preview-title">{activeNote.title}</h1>
        <ReactMarkdown className="markdown-preview">
          {activeNote.body}
        </ReactMarkdown>
        {activeNote.image && <img src={activeNote.image} alt="Note" />}
      </div>
    </div>
  );
};

export default Main;
