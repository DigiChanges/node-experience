function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
 * Copyright 2019 Red Hat, Inc. and/or its affiliates.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import * as React from "../../../../common/keycloak/web_modules/react.js";
import { Button, Chip, ChipGroup, Form, FormGroup, Gallery, GalleryItem, Modal, Stack, StackItem, TextInput, ModalVariant } from "../../../../common/keycloak/web_modules/@patternfly/react-core.js";
import { AccountServiceContext } from "../../account-service/AccountServiceContext.js";
import { Msg } from "../../widgets/Msg.js";
import { ContentAlert } from "../ContentAlert.js";
import { PermissionSelect } from "./PermissionSelect.js";

/**
 * @author Stan Silvert ssilvert@redhat.com (C) 2019 Red Hat Inc.
 */
export class ShareTheResource extends React.Component {
  constructor(props, context) {
    super(props);

    _defineProperty(this, "context", void 0);

    _defineProperty(this, "handleAddPermission", () => {
      const rscId = this.props.resource._id;
      const newPermissions = [];

      for (const permission of this.state.permissionsSelected) {
        newPermissions.push(permission.name);
      }

      const permissions = [];

      for (const username of this.state.usernames) {
        permissions.push({
          username: username,
          scopes: newPermissions
        });
      }

      this.handleToggleDialog();
      this.context.doPut(`/resources/${rscId}/permissions`, permissions).then(() => {
        ContentAlert.success('shareSuccess');
        this.props.onClose();
      });
    });

    _defineProperty(this, "handleToggleDialog", () => {
      if (this.state.isOpen) {
        this.setState({
          isOpen: false
        });
        this.props.onClose();
      } else {
        this.clearState();
        this.setState({
          isOpen: true
        });
      }
    });

    _defineProperty(this, "handleUsernameChange", username => {
      this.setState({
        usernameInput: username
      });
    });

    _defineProperty(this, "handleAddUsername", async () => {
      if (this.state.usernameInput !== '' && !this.state.usernames.includes(this.state.usernameInput)) {
        const response = await this.context.doGet(`/resources/${this.props.resource._id}/user`, {
          params: {
            value: this.state.usernameInput
          }
        });

        if (response.data && response.data.username) {
          this.setState({
            usernameInput: '',
            usernames: [...this.state.usernames, this.state.usernameInput]
          });
        } else {
          ContentAlert.info('userNotFound', [this.state.usernameInput]);
        }
      }
    });

    _defineProperty(this, "handleEnterKeyInAddField", event => {
      if (event.key === "Enter") {
        event.preventDefault();
        this.handleAddUsername();
      }
    });

    _defineProperty(this, "handleDeleteUsername", username => {
      const newUsernames = this.state.usernames.filter(user => user !== username);
      this.setState({
        usernames: newUsernames
      });
    });

    this.context = context;
    this.state = {
      isOpen: false,
      permissionsSelected: [],
      permissionsUnSelected: this.props.resource.scopes,
      usernames: [],
      usernameInput: ''
    };
  }

  clearState() {
    this.setState({
      permissionsSelected: [],
      permissionsUnSelected: this.props.resource.scopes,
      usernames: [],
      usernameInput: ''
    });
  }

  isAddDisabled() {
    return this.state.usernameInput === '' || this.isAlreadyShared();
  }

  isAlreadyShared() {
    for (let permission of this.props.permissions) {
      if (permission.username === this.state.usernameInput) return true;
    }

    return false;
  }

  isFormInvalid() {
    return this.state.usernames.length === 0 || this.state.permissionsSelected.length === 0;
  }

  render() {
    return /*#__PURE__*/React.createElement(React.Fragment, null, this.props.children(this.handleToggleDialog), /*#__PURE__*/React.createElement(Modal, {
      title: 'Share the resource - ' + this.props.resource.name,
      variant: ModalVariant.large,
      isOpen: this.state.isOpen,
      onClose: this.handleToggleDialog,
      actions: [/*#__PURE__*/React.createElement(Button, {
        key: "cancel",
        variant: "link",
        onClick: this.handleToggleDialog
      }, /*#__PURE__*/React.createElement(Msg, {
        msgKey: "cancel"
      })), /*#__PURE__*/React.createElement(Button, {
        key: "confirm",
        variant: "primary",
        id: "done",
        onClick: this.handleAddPermission,
        isDisabled: this.isFormInvalid()
      }, /*#__PURE__*/React.createElement(Msg, {
        msgKey: "done"
      }))]
    }, /*#__PURE__*/React.createElement(Stack, {
      hasGutter: true
    }, /*#__PURE__*/React.createElement(StackItem, {
      isFilled: true
    }, /*#__PURE__*/React.createElement(Form, null, /*#__PURE__*/React.createElement(FormGroup, {
      label: "Add users to share your resource with",
      type: "string",
      helperTextInvalid: Msg.localize('resourceAlreadyShared'),
      fieldId: "username",
      isRequired: true
    }, /*#__PURE__*/React.createElement(Gallery, {
      hasGutter: true
    }, /*#__PURE__*/React.createElement(GalleryItem, null, /*#__PURE__*/React.createElement(TextInput, {
      value: this.state.usernameInput,
      id: "username",
      "aria-describedby": "username-helper",
      placeholder: "Username or email",
      onChange: this.handleUsernameChange,
      onKeyPress: this.handleEnterKeyInAddField
    })), /*#__PURE__*/React.createElement(GalleryItem, null, /*#__PURE__*/React.createElement(Button, {
      key: "add-user",
      variant: "primary",
      id: "add",
      onClick: this.handleAddUsername,
      isDisabled: this.isAddDisabled()
    }, /*#__PURE__*/React.createElement(Msg, {
      msgKey: "add"
    })))), /*#__PURE__*/React.createElement(ChipGroup, {
      categoryName: Msg.localize('shareWith')
    }, this.state.usernames.map(currentChip => /*#__PURE__*/React.createElement(Chip, {
      key: currentChip,
      onClick: () => this.handleDeleteUsername(currentChip)
    }, currentChip)))), /*#__PURE__*/React.createElement(FormGroup, {
      label: "",
      fieldId: "permissions-selected"
    }, /*#__PURE__*/React.createElement(PermissionSelect, {
      scopes: this.state.permissionsUnSelected,
      onSelect: selection => this.setState({
        permissionsSelected: selection
      }),
      direction: "up"
    })))), /*#__PURE__*/React.createElement(StackItem, {
      isFilled: true
    }, /*#__PURE__*/React.createElement("br", null)), /*#__PURE__*/React.createElement(StackItem, {
      isFilled: true
    }, this.props.sharedWithUsersMsg))));
  }

}

_defineProperty(ShareTheResource, "defaultProps", {
  permissions: []
});

_defineProperty(ShareTheResource, "contextType", AccountServiceContext);
//# sourceMappingURL=ShareTheResource.js.map