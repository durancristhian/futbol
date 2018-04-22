import Cover from './Cover';
import Lightbox from 'react-images';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

const styles = {
  color: 'white',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "avenir next", avenir, "helvetica neue", helvetica, ubuntu, roboto, noto, "segoe ui", arial, sans-serif',
  fontSize: '1rem'
};

const LightboxTheme = {
  footer: styles,
  footerCount: styles
};

class Covers extends Component {
  constructor(props) {
    super(props);

    this.closeLightbox = this.closeLightbox.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.gotoPrevious = this.gotoPrevious.bind(this);
    this.showLightbox = this.showLightbox.bind(this);

    this.state = {
      currentImage: 0,
      lightboxIsOpen: false
    };
  }

  static propTypes = {
    covers: PropTypes.arrayOf(Cover.propTypes.cover).isRequired
  };

  closeLightbox() {
    this.setState({
      lightboxIsOpen: false
    });
  }

  gotoNext() {
    this.setState({
      currentImage: this.state.currentImage + 1
    });
  }

  gotoPrevious() {
    this.setState({
      currentImage: this.state.currentImage - 1
    });
  }

  showLightbox(event, currentIndex) {
    event.preventDefault();

    this.setState({
      currentImage: currentIndex,
      lightboxIsOpen: true
    });
  }

  render() {
    const { covers } = this.props;
    const { currentImage, lightboxIsOpen } = this.state;

    return (
      <div className="mv4 mv5-ns">
        <h2 className="f4 f3-ns mb4 mb5-ns mt0 normal tc">Tapas de Olé</h2>
        <div className="flex flex-wrap justify-between nl3-l nr3-l">
          {covers.map((cover, index) => (
            <Cover key={cover.Fecha} cover={cover} index={index} onClick={this.showLightbox} />
          ))}
        </div>
        <Lightbox
          backdropClosesModal={true}
          closeButtonTitle="Cerrar"
          currentImage={currentImage}
          imageCountSeparator=" de "
          images={covers.map((cover) => ({
            alt: cover.Fecha,
            caption: cover.Fecha,
            src: cover.Portada
          }))}
          isOpen={lightboxIsOpen}
          leftArrowTitle="Anterior"
          onClickNext={this.gotoNext}
          onClickPrev={this.gotoPrevious}
          onClose={this.closeLightbox}
          rightArrowTitle="Siguiente"
          theme={LightboxTheme}
        />
        <p className="f7 mb0 mt3 tr">
          Armá tu Tapa de Olé
          <a
            href="https://tapa-ole.now.sh/"
            target="_blank"
            className="b color-inherit ml1 pa0"
            rel="noopener noreferrer"
          >
            en esta página
          </a>
        </p>
      </div>
    );
  }
}

export default Covers;
