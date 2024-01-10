class Renderer {
    constructor(containerId, templateId) {
      this.container = $(`#${containerId}`);
      this.template = $(`#${templateId}`).html();
      if (!this.container.length || !this.template) {
        throw new Error('Container or template ID not found.');
      }
    }
  
    render(savedCities,cityWeatherObj) {
      console.log('this is from the render.js',cityWeatherObj)
      try {
        this.clearContainer();
        const compiledTemplate = Handlebars.compile(this.template);
        const context = {
          savedCities : savedCities,
          cityWeatherObj : cityWeatherObj
  
        }
        const renderedHTML = compiledTemplate(context);
        this.container.html(renderedHTML);
      } catch (error) {
        console.error('Rendering error:', error);
      }
    }
  
    clearContainer() {
      this.container.empty();
    }
    
  
  }