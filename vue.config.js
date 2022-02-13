module.exports = {
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args.forEach((arg) => {
        arg.title = "新闻标题";
      });
      return args;
    });
  },
};
