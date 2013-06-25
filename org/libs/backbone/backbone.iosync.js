

/*!
 * backbone.iobind - Backbone.sync replacement
 * Copyright(c) 2011 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
define(['underscore','backbone','bsend'],function(_,Backbone,Bsend){

/**
 * # Backbone.sync
 *
 * Replaces default Backbone.sync function with socket.io transport
 *
 * ### Assumptions
 *
 * Currently expects active socket to be located at `window.socket`,
 * `Backbone.socket` or the sync'ed model own socket.
 * See inline comments if you want to change it.
 * ### Server Side
 *
 *     socket.on('todos:create', function (data, fn) {
 *      ...
 *      fn(null, todo);
 *     });
 *     socket.on('todos:read', ... );
 *     socket.on('todos:update', ... );
 *     socket.on('todos:delete', ... );
 *
 * @name sync
 */
Backbone.sync = function (method, model, options) {
  var getUrl = function (object) {
    if (!(object && object.url)) return null;
    return _.isFunction(object.url) ? object.url() : object.url;
  };
  var all = (options.all)? true: false;
  var cmd = getUrl(model).split('/')
    , namespace = (cmd[0] !== '') ? cmd[0] : cmd[1]; // if leading slash, ignore

  var params = _.extend({
    req: namespace + ':' + method
  }, options);
  if(_.has(model,'collection') && _.isObject(options.attrs) && !params.data && model)
  {
        params.data = options.attrs || {};
        params.data._id = model.id;
  }
  else if (!params.data && model ) {
    params.data = model.toJSON() || {};
  }
  //console.log('Changed', model.changedAttributes())
 /* if (all && !params.data && model ) {
    params.data = model.toJSON() || {};
  }else{
    params.data = options.attr || {};
  }
  */

  // If your socket.io connection exists on a different var, change here:
  var io;
  if(_.has(model,'socket')){
    io = model.socket;
    
  }
  else if(_.has(model,'collection')){
    if(_.has(model.collection,'socket')){
      io = model.collection.socket
    }else
    io = window.socket || Backbone.socket;
  }
  else
   io =  window.socket || Backbone.socket;
  io.emit(namespace + ':' + method, Bsend.encode(JSON.stringify(params.data)), function (err, data) {

    if (err) {
      options.error(err);
    } else {
      var msg = JSON.parse(Bsend.decode(data))
      options.success(msg);
    }
  });
};

return Backbone;
})