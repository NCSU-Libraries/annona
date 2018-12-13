module.exports = {
  getContext: jest.fn(() => {
    return {
      fillStyle: null,
      fillRect: jest.fn(),
      drawImage: jest.fn(),
      getImageData: jest.fn(),
    };
  })
}
