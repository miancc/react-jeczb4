class Util {
  /*
   * @author Miguel Chan
   * Funcion para obtener los valores de los elementos de un formulario
   */
  static getValidateDataForm(form, showMsgError, language) {
    var element,
      value,
      json = {},
      elements = form.elements,
      errors = [],
      msnError = '<dl>',
      min = 0,
      max = -1,
      isNum = false,
      hasError = false;
    language = language || 'es';
    for (var i = 0; i < elements.length; i++) {
      (element = elements[i]), (min = 0), (max = -1), (isNum = false);
      console.log(element.name);
      if (element.name) {
        var getValidate = element.hasAttribute('required');
        var idInput = element.hasAttribute('id') ? element.id : element.name,
          label = form.querySelector(`label[for='${idInput}']`),
          txtLabel = label ? label.innerText : element.name;
        if (element.nodeName == 'INPUT' && element.type == 'radio') {
          var options = form.querySelector(`input[name="${element.name}"]`);
          for (var j = 0; j < options.length; j++) {
            if (options[j].checked) {
              value = options[j].value;
            }
          }
        } else if (element.nodeName == 'INPUT' && element.type == 'checkbox') {
          value = element.checked ? 1 : 0;
        } else if (element.nodeName == 'SELECT' && element.multiple) {
          json['attributeMultiple'] = element.name;
          value = Util.getDataAttributeMultiple(element.id);
        } else if (element.nodeName == 'INPUT' && element.type == 'number') {
          value = element.value;
          min = element.hasAttribute('min') ? element.min : 0;
          max = element.hasAttribute('max') ? element.max : -1;
          isNum = true;
        } else if (
          element.nodeName == 'INPUT' &&
          (element.type == 'text' ||
            element.type == 'password' ||
            element.type == 'email')
        ) {
          value = element.value;
          min = element.hasAttribute('minlength') ? element.minLength : 0;
          max = element.hasAttribute('maxlength') ? element.maxLength : -1;
        } else {
          value = element.value;
        }
        var error = Util.ValidateValueInput(
          txtLabel,
          value,
          min,
          max,
          isNum,
          language
        );
        if (getValidate && error) {
          errors.push(error);
          hasError = true;
          msnError += `<dt>${error.field} ${error.message}</dt>`;
        }
        json[element.name] = value;
        value = '';
      }
    }

    if (hasError && !(showMsgError == false)) {
      msnError += ' </dl>';
      Util.getMsnDialog('warning', msnError);
    }

    return { data: json, error: hasError, message: errors };
  }

  /**
   * @author Miguel Chan
   * Funcion para obtener si el valor del input es valido
   */
  static ValidateValueInput(name, valueB, vMin, vMax, isNum, language) {
    var min = isNaN(vMin) ? 0 : Number(vMin),
      max = isNaN(vMax) ? -1 : Number(vMax),
      isNum = isNum == undefined ? false : isNum,
      value = typeof valueB === 'string' ? valueB.trim() : valueB,
      value = !isNum || value == '' || isNaN(value) ? value : Number(value),
      valueLength = isNum ? 0 : value.length;

    if (value === undefined || value === null || value === '') {
      return {
        field: name,
        message: language == 'es' ? `es requerido` : `is required`,
      };
    } else if (
      (isNum && value < min) ||
      (isNum == false && valueLength < min)
    ) {
      return {
        field: name,
        message:
          language == 'es'
            ? `el valor es menor que el valor requerido`
            : `the value is less than the required value`,
      };
    } else if (
      (isNum && max != -1 && value > max) ||
      (isNum == false && max != -1 && valueLength > max)
    ) {
      return {
        field: name,
        message:
          language == 'es'
            ? `el valor es mayor que el valor permitido`
            : `the value is greater than the allowed value`,
      };
    }
    return null;
  }

  /**
   * @author Miguel Chan
   * Funcion para obtener el html para una alerta
   */
  static getMsnDialog(type, msnText, displayLength = 4000) {
    var classToast = ['info', 'success', 'warning', 'danger'];
    if (classToast.includes(type) && typeof type === 'string') {
      var typeMsn = type.charAt(0).toUpperCase() + type.slice(1);
      return Util.toast(`<h6><b>${typeMsn}!</b> ${msnText}</h6>`, {
        classes: type,
        displayLength: displayLength,
      });
    }

    return;
  }

  /**
   * Se inicializa y obtiene la instancias de los componentes toast
   * @param string
   * @param object
   * @return object <element>
   */
  static toast(htmlMsn, options = {}) {
    var opt = Object.assign(options);
    opt.html = htmlMsn;
    return window.M.toast(opt);
  }

  /**
   * Funcion para re-inicializar los <label> de los <input> agregados dinamicamente.
   * @return mixed
   */
  static updateTextFields() {
    return window.M.updateTextFields();
  }

  /**
   * @author Miguel Chan <michan@palaceresorts.com>
   * Funcion para obtener los valores de los elementos multiples de un formulario
   */
  static getDataAttributeMultiple(idAttributeMultiple) {
    var select = document.querySelector(`select#${idAttributeMultiple}`),
      options = select.selectedOptions,
      optionsSelect = [];
    for (var i = 0; i < options.length; i++) {
      if (options[i].value.trim() != '') {
        optionsSelect.push(options[i].value);
      }
    }

    return optionsSelect;
  }

  /**
   * @author Miguel Chan
   * Valida dado un string de correo es valido
   * @param value:(String)
   * @return mixed
   */
  static isValidEmail(value) {
    var mailformat =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return value.match(mailformat);
  }
}

module.exports = Util;
