jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
  Map: () => ({}),
}));
