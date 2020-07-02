import React from 'react';
import styled from "styled-components";
import {connect} from 'react-redux';
import {setModal} from "../../../store/actions/modalActions";
import ImageGallery from "react-image-gallery";

// Styling

const PostImages = styled.div`
  margin-bottom: 1.5rem;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  
  & button {
    outline: none;
  }
`;

// Component

const PostImageCarousel = ({post, setModal}) => {
    // the carousel requires the images to be passed in a specific way as a prop
    const convertImagesForGallery = images => images.map(({image}) => ({original: image, thumbnail: image}));

    // sets the isVisible flag of the <ModalPostDetail /> to true
    const handleOpenModal = e => {
        setModal('ModalPostDetail', post, true);
    }

    return <PostImages>
        {post && !!post.images.length &&
        <ImageGallery
            items={convertImagesForGallery(post.images)}
            showThumbnails={false}
            showFullscreenButton={false}
            showPlayButton={false}
            disableKeyDown={true}
            lazyLoad={true}
            onClick={handleOpenModal}
        />
        }
    </PostImages>
};

export default connect(null, {setModal})(PostImageCarousel)