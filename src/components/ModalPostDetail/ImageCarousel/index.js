import React from 'react';
import styled from 'styled-components';
import ImageGallery from 'react-image-gallery'; // https://github.com/xiaolin/react-image-gallery


const PostImages = styled.div`
    /* margin-bottom: 1.5rem; */
    width: 100%;
    height: 100%;
    /* overflow: hidden; */
    cursor: pointer;
    
    & button {
        outline: none;
    }
    .image-gallery {
        height: 100%;
    }

    .image-gallery-content .bottom {
        height: 100%;
    }

    .image-gallery-content .image-gallery-slide .image-gallery-image {
        max-height: 90vh;
    }
`;


// the carousel requires the images to be passed in a specific way as a prop
const convertImagesForGallery = (images) => images.map(({ image }) => ({ original: image, thumbnail: image }));


const PostImageCarousel = ({ post }) => {
    return <PostImages>
        {
            post && post.images.length &&
            <ImageGallery
                items={convertImagesForGallery(post.images)}
                showThumbnails={false}
                showFullscreenButton={false}
                showPlayButton={false}
                lazyLoad={true}
                disableKeyDown={false}
                showBullets={true}
                showNav={false}
            />
        }
    </PostImages>
};

export default PostImageCarousel;
