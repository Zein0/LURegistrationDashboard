import React, { useContext, useState } from "react";
import { DropzoneArea } from "material-ui-dropzone";
import "./dropzone.css";
import { Button } from "@mui/material";
import { AdminDataContext } from "../../contexts/AdminDataContext";

const DropZone = () => {
	const {
		state: { submitFileLoading },
		actions: { submitFile },
	} = useContext(AdminDataContext);
	const [file, setFile] = useState(null);

	const onFileChange = (filesImage1) => {
		if (!filesImage1.length) {
			return;
		}
		setFile(filesImage1[0]);
	};

	return (
		<div className="dropzone-container">
			<DropzoneArea
				showPreviews={true}
				showPreviewsInDropzone={false}
				useChipsForPreview
				filesLimit={1}
				acceptedFiles={[".xlsx"]}
				onChange={(files) => onFileChange(files)}
				previewGridProps={{ container: { spacing: 1, direction: "row" } }}
				// previewChipProps={{
				//   classes: { root: { backgroundColor: 'rgb(246, 246, 247)' } },
				// }}
				previewText="Selected File"
				dropzoneText="Drop xlsx file"
			/>
			<Button
				disabled={submitFileLoading}
				variant="contained"
				className="dropzone-btn"
				onClick={() => submitFile(file)}
			>
				Submit
			</Button>
		</div>
	);
};

export default DropZone;
