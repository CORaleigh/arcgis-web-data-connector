'use strict';

var mockery = require('mockery'),
    assert = require('assert'),
    sinon = require('sinon'),
    jQuery = require('../bower_components/jquery/dist/jquery.js')(require('jsdom').jsdom().parentWindow),
    tableau = require('./util/tableau.js'),
    connector = require('./util/connector.js'),
    wdcwConfig;

describe('arcgis-web-data-connector:setup', function describesConnectorSetup() {

  beforeEach(function connectorSetupBeforeEach() {
    wdcwConfig = require('../src/main.js');
  });

  it('resolves during interactive phase', function connectorSetupInteractive(done) {
    // If available, ensure the setup phase resolves during interaction.
    if (wdcwConfig.hasOwnProperty('setup')) {
      wdcwConfig.setup.call(connector, tableau.phaseEnum.interactivePhase)
        .then(function () {
          done();
        });
    }
    else {
      done();
    }
  });

  it('resolves during auth phase', function connectorSetupAuth(done) {
    // If available, ensure setup phase resolves during authentication
    if (wdcwConfig.hasOwnProperty('setup')) {
      wdcwConfig.setup.call(connector, tableau.phaseEnum.authPhase)
        .then(function (){
          done();
        });
    }
    else {
      done();
    }
  });

  it('resolves during data gathering phase', function connectorSetupData(done) {
    // If available, ensure the setup phase resolves during data gathering.
    if (wdcwConfig.hasOwnProperty('setup')) {
      wdcwConfig.setup.call(connector, tableau.phaseEnum.gatherDataPhase)
        .then(function () {
          done();
        });
    }
    else {
      done();
    }
  });

});

describe('arcgis-web-data-connector:schema', function describesConnectorSchema() {
  beforeEach(function connectorSchemaBeforeEach() {
    // Here's how you might stub or mock various jQuery methods.
    mockery.enable({
      warnOnReplace: false,
      warnOnUnregistered: false,
      useCleanCache: true
    });
    sinon.stub(jQuery, 'ajax', function (url, cb) {cb();});
    sinon.stub(jQuery, 'getJSON', function (url) {return url;});
    sinon.stub(jQuery, 'when', function (arg) {return [arg];});
    mockery.registerMock('jquery', jQuery);

    wdcwConfig = require('../src/main.js');
  });

  afterEach(function connectorSchemaAfterEach() {
    // Don't forget to restore their original implementations after each test.
    jQuery.ajax.restore();
    jQuery.getJSON.restore();
    jQuery.when.restore();
    mockery.deregisterMock('jquery');
    mockery.deregisterAll();
    mockery.resetCache();
    mockery.disable();
  });

  // This test is not very meaningful. You should write actual test logic here
  // and/or in new cases below.
  it('should be tested here', function connectorSchemaTestHere(done) {
    wdcwConfig.schema.call(connector)
      .then(function (schemaData) {
        assert(jQuery.ajax.called || jQuery.getJSON.called);
        assert(Array.isArray(schemaData));
        done();
      });
  });

});

describe('arcgis-web-data-connector:getData', function describesConnectorGetData() {

  beforeEach(function connectorGetDataBeforeEach() {
    // Here's how you might stub or mock various jQuery methods.
    mockery.enable({
      warnOnReplace: false,
      warnOnUnregistered: false,
      useCleanCache: true
    });
    sinon.stub(jQuery, 'ajax', function (config) {return config;});
    sinon.stub(jQuery, 'getJSON', function (url) {return url;});
    sinon.stub(jQuery, 'when', function (arg) {return Promise.resolve([arg]);});
    mockery.registerMock('jquery', jQuery);

    wdcwConfig = require('../src/main.js');
  });

  afterEach(function connectorGetDataAfterEach() {
    // Don't forget to restore their original implementations after each test.
    jQuery.ajax.restore();
    jQuery.getJSON.restore();
    jQuery.when.restore();
    mockery.deregisterMock('jquery');
    mockery.deregisterAll();
    mockery.resetCache();
    mockery.disable();
  });

  // This test is not very meaningful. You should write actual test logic here
  // and/or in new cases below.
  it('should be tested here', function connectorGetDataTestHere(done) {
    wdcwConfig.tables.tableId.getData.call(connector)
      .then(function (data) {
        assert(jQuery.ajax.called || jQuery.getJSON.called);
        assert(Array.isArray(data));
        done();
      });
  });

});

describe('arcgis-web-data-connector:postProcess', function describesConnectorPostProcess() {

  beforeEach(function connectorPostProcessBeforeEach() {
    wdcwConfig = require('../src/main.js');
  });

  // This test is not very meaningful. You should write actual test logic here
  // and/or in new cases below.
  it('should be tested here', function connectorPostProcessTestHere(done) {
    var mockData = {entities: []};

    wdcwConfig.tables.tableId.postProcess.call(connector, mockData)
      .then(function (data) {
        assert(Array.isArray(data));
        done();
      });
  });

});

describe('arcgis-web-data-connector:teardown', function describesConnectorTearDown() {
  var tearDownComplete;

  beforeEach(function connectorTearDownBeforeEach() {
    tearDownComplete = sinon.spy();
    wdcwConfig = require('../src/main.js');
  });

  it('resolves teardown', function connectorTearDown(done) {
    // If available, ensure the completion callback is always called.
    if (wdcwConfig.hasOwnProperty('teardown')) {
      wdcwConfig.teardown.call(connector)
        .then(function () {
          done();
        });
    }
  });

});
