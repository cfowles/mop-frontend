export const unwrapReduxComponent = mountedContext => (
  // MountedContext will be something like mount(<Foo ... />)
  // This method gets you the Foo context, unwrapped from its redux and mount wrapper

  // This is pretty hacky, but haven't found a better way to get this.
  // You can try something like mountedContext.find(Foo).get(0) but
  // I believe this only returns the redux-wrapped instance.
  // If you want to unhack this, then instance._reactInternalInstance._debugID
  // will help.
  mountedContext.instance()._reactInternalInstance._renderedComponent._instance
)
