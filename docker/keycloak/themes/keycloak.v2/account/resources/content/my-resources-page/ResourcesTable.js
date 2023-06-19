function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
 * Copyright 2018 Red Hat, Inc. and/or its affiliates.
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
import { DataList, DataListItem, DataListItemRow, DataListCell, DataListToggle, DataListContent, DataListItemCells, Level, LevelItem, Button, DataListAction, Dropdown, DropdownPosition, DropdownItem, KebabToggle } from "../../../../common/keycloak/web_modules/@patternfly/react-core.js";
import { Remove2Icon, RepositoryIcon, ShareAltIcon, EditAltIcon } from "../../../../common/keycloak/web_modules/@patternfly/react-icons.js";
import { AccountServiceContext } from "../../account-service/AccountServiceContext.js";
import { PermissionRequest } from "./PermissionRequest.js";
import { ShareTheResource } from "./ShareTheResource.js";
import { Msg } from "../../widgets/Msg.js";
import { AbstractResourcesTable } from "./AbstractResourceTable.js";
import { EditTheResource } from "./EditTheResource.js";
import { ContentAlert } from "../ContentAlert.js";
import EmptyMessageState from "../../widgets/EmptyMessageState.js";
import { ContinueCancelModal } from "../../widgets/ContinueCancelModal.js";
export class ResourcesTable extends AbstractResourcesTable {
  constructor(props, context) {
    super(props);

    _defineProperty(this, "context", void 0);

    _defineProperty(this, "onToggle", row => {
      const newIsRowOpen = this.state.isRowOpen;
      newIsRowOpen[row] = !newIsRowOpen[row];
      if (newIsRowOpen[row]) this.fetchPermissions(this.props.resources.data[row], row);
      this.setState({
        isRowOpen: newIsRowOpen
      });
    });

    _defineProperty(this, "onContextToggle", (row, isOpen) => {
      if (this.state.isModalActive) return;
      const data = this.props.resources.data;
      const contextOpen = this.state.contextOpen;
      contextOpen[row] = isOpen;

      if (isOpen) {
        const index = row > data.length ? row - data.length - 1 : row;
        this.fetchPermissions(data[index], index);
      }

      this.setState({
        contextOpen
      });
    });

    this.context = context;
    this.state = {
      isRowOpen: [],
      contextOpen: [],
      isModalActive: false,
      permissions: new Map()
    };
  }

  fetchPermissions(resource, row) {
    this.context.doGet(`/resources/${resource._id}/permissions`).then(response => {
      const newPermissions = new Map(this.state.permissions);
      newPermissions.set(row, response.data || []);
      this.setState({
        permissions: newPermissions
      });
    });
  }

  removeShare(resource, row) {
    const permissions = this.state.permissions.get(row).map(a => ({
      username: a.username,
      scopes: []
    }));
    return this.context.doPut(`/resources/${resource._id}/permissions`, permissions).then(() => {
      ContentAlert.success(Msg.localize('unShareSuccess'));
    });
  }

  render() {
    if (this.props.resources.data.length === 0) {
      return /*#__PURE__*/React.createElement(EmptyMessageState, {
        icon: RepositoryIcon,
        messageKey: "notHaveAnyResource"
      });
    }

    return /*#__PURE__*/React.createElement(DataList, {
      "aria-label": Msg.localize('resources'),
      id: "resourcesList"
    }, /*#__PURE__*/React.createElement(DataListItem, {
      key: "resource-header",
      "aria-labelledby": "resource-header"
    }, /*#__PURE__*/React.createElement(DataListItemRow, null, "// invisible toggle allows headings to line up properly", /*#__PURE__*/React.createElement("span", {
      style: {
        visibility: 'hidden'
      }
    }, /*#__PURE__*/React.createElement(DataListToggle, {
      isExpanded: false,
      id: "resource-header-invisible-toggle",
      "aria-controls": "ex-expand1"
    })), /*#__PURE__*/React.createElement(DataListItemCells, {
      dataListCells: [/*#__PURE__*/React.createElement(DataListCell, {
        key: "resource-name-header",
        width: 5
      }, /*#__PURE__*/React.createElement("strong", null, /*#__PURE__*/React.createElement(Msg, {
        msgKey: "resourceName"
      }))), /*#__PURE__*/React.createElement(DataListCell, {
        key: "application-name-header",
        width: 5
      }, /*#__PURE__*/React.createElement("strong", null, /*#__PURE__*/React.createElement(Msg, {
        msgKey: "application"
      }))), /*#__PURE__*/React.createElement(DataListCell, {
        key: "permission-request-header",
        width: 5
      }, /*#__PURE__*/React.createElement("strong", null, /*#__PURE__*/React.createElement(Msg, {
        msgKey: "permissionRequests"
      })))]
    }))), this.props.resources.data.map((resource, row) => /*#__PURE__*/React.createElement(DataListItem, {
      key: 'resource-' + row,
      "aria-labelledby": resource.name,
      isExpanded: this.state.isRowOpen[row]
    }, /*#__PURE__*/React.createElement(DataListItemRow, null, /*#__PURE__*/React.createElement(DataListToggle, {
      onClick: () => this.onToggle(row),
      isExpanded: this.state.isRowOpen[row],
      id: 'resourceToggle-' + row,
      "aria-controls": "ex-expand1"
    }), /*#__PURE__*/React.createElement(DataListItemCells, {
      dataListCells: [/*#__PURE__*/React.createElement(DataListCell, {
        id: 'resourceName-' + row,
        key: 'resourceName-' + row,
        width: 5
      }, /*#__PURE__*/React.createElement(Msg, {
        msgKey: resource.name
      })), /*#__PURE__*/React.createElement(DataListCell, {
        id: 'resourceClient-' + row,
        key: 'resourceClient-' + row,
        width: 5
      }, /*#__PURE__*/React.createElement("a", {
        href: resource.client.baseUrl
      }, this.getClientName(resource.client))), /*#__PURE__*/React.createElement(DataListCell, {
        id: 'resourceRequests-' + row,
        key: 'permissionRequests-' + row,
        width: 5
      }, resource.shareRequests.length > 0 && /*#__PURE__*/React.createElement(PermissionRequest, {
        resource: resource,
        onClose: () => this.fetchPermissions(resource, row)
      }))]
    }), /*#__PURE__*/React.createElement(DataListAction, {
      visibility: {
        lg: 'hidden'
      },
      "aria-labelledby": "check-action-item3 check-action-action3",
      id: "check-action-action3",
      "aria-label": "Actions"
    }, /*#__PURE__*/React.createElement(Dropdown, {
      isPlain: true,
      position: DropdownPosition.right,
      onSelect: () => this.setState({
        isModalActive: true
      }),
      toggle: /*#__PURE__*/React.createElement(KebabToggle, {
        onToggle: isOpen => this.onContextToggle(row + this.props.resources.data.length + 1, isOpen)
      }),
      isOpen: this.state.contextOpen[row + this.props.resources.data.length + 1],
      dropdownItems: [/*#__PURE__*/React.createElement(ShareTheResource, {
        resource: resource,
        permissions: this.state.permissions.get(row),
        sharedWithUsersMsg: this.sharedWithUsersMessage(row),
        onClose: () => {
          this.setState({
            isModalActive: false
          }, () => {
            this.onContextToggle(row + this.props.resources.data.length + 1, false);
            this.fetchPermissions(resource, row + this.props.resources.data.length + 1);
          });
        }
      }, toggle => /*#__PURE__*/React.createElement(DropdownItem, {
        id: 'mob-share-' + row,
        key: "mob-share",
        onClick: toggle
      }, /*#__PURE__*/React.createElement(ShareAltIcon, null), " ", /*#__PURE__*/React.createElement(Msg, {
        msgKey: "share"
      }))), /*#__PURE__*/React.createElement(EditTheResource, {
        resource: resource,
        permissions: this.state.permissions.get(row),
        onClose: () => {
          this.setState({
            isModalActive: false
          }, () => {
            this.onContextToggle(row + this.props.resources.data.length + 1, false);
            this.fetchPermissions(resource, row + this.props.resources.data.length + 1);
          });
        }
      }, toggle => /*#__PURE__*/React.createElement(DropdownItem, {
        id: 'mob-edit-' + row,
        key: "mob-edit",
        isDisabled: this.numOthers(row) < 0,
        onClick: toggle
      }, /*#__PURE__*/React.createElement(EditAltIcon, null), " ", /*#__PURE__*/React.createElement(Msg, {
        msgKey: "edit"
      }))), /*#__PURE__*/React.createElement(ContinueCancelModal, {
        render: toggle => /*#__PURE__*/React.createElement(DropdownItem, {
          id: 'mob-remove-' + row,
          key: "mob-remove",
          isDisabled: this.numOthers(row) < 0,
          onClick: toggle
        }, /*#__PURE__*/React.createElement(Remove2Icon, null), " ", /*#__PURE__*/React.createElement(Msg, {
          msgKey: "unShare"
        })),
        modalTitle: "unShare",
        modalMessage: "unShareAllConfirm",
        onClose: () => this.setState({
          isModalActive: false
        }, () => {
          this.onContextToggle(row + this.props.resources.data.length + 1, false);
        }),
        onContinue: () => this.removeShare(resource, row).then(() => this.fetchPermissions(resource, row + this.props.resources.data.length + 1))
      })]
    })), /*#__PURE__*/React.createElement(DataListAction, {
      id: `actions-${row}`,
      visibility: {
        default: 'hidden',
        lg: 'visible'
      },
      "aria-labelledby": "Row actions",
      "aria-label": "Actions"
    }, /*#__PURE__*/React.createElement(ShareTheResource, {
      resource: resource,
      permissions: this.state.permissions.get(row),
      sharedWithUsersMsg: this.sharedWithUsersMessage(row),
      onClose: () => this.fetchPermissions(resource, row)
    }, toggle => /*#__PURE__*/React.createElement(Button, {
      id: `share-${row}`,
      variant: "link",
      onClick: toggle
    }, /*#__PURE__*/React.createElement(ShareAltIcon, null), " ", /*#__PURE__*/React.createElement(Msg, {
      msgKey: "share"
    }))), /*#__PURE__*/React.createElement(Dropdown, {
      id: `action-menu-${row}`,
      isPlain: true,
      position: DropdownPosition.right,
      toggle: /*#__PURE__*/React.createElement(KebabToggle, {
        onToggle: isOpen => this.onContextToggle(row, isOpen)
      }),
      onSelect: () => this.setState({
        isModalActive: true
      }),
      isOpen: this.state.contextOpen[row],
      dropdownItems: [/*#__PURE__*/React.createElement(EditTheResource, {
        resource: resource,
        permissions: this.state.permissions.get(row),
        onClose: () => {
          this.setState({
            isModalActive: false
          }, () => {
            this.onContextToggle(row, false);
            this.fetchPermissions(resource, row);
          });
        }
      }, toggle => /*#__PURE__*/React.createElement(DropdownItem, {
        id: 'edit-' + row,
        key: "edit",
        component: "button",
        isDisabled: this.numOthers(row) < 0,
        onClick: toggle
      }, /*#__PURE__*/React.createElement(EditAltIcon, null), " ", /*#__PURE__*/React.createElement(Msg, {
        msgKey: "edit"
      }))), /*#__PURE__*/React.createElement(ContinueCancelModal, {
        render: toggle => /*#__PURE__*/React.createElement(DropdownItem, {
          id: 'remove-' + row,
          key: "remove",
          component: "button",
          isDisabled: this.numOthers(row) < 0,
          onClick: toggle
        }, /*#__PURE__*/React.createElement(Remove2Icon, null), " ", /*#__PURE__*/React.createElement(Msg, {
          msgKey: "unShare"
        })),
        modalTitle: "unShare",
        modalMessage: "unShareAllConfirm",
        onClose: () => this.setState({
          isModalActive: false
        }, () => {
          this.onContextToggle(row, false);
        }),
        onContinue: () => this.removeShare(resource, row).then(() => this.fetchPermissions(resource, row))
      })]
    }))), /*#__PURE__*/React.createElement(DataListContent, {
      hasNoPadding: false,
      "aria-label": "Session Details",
      id: 'ex-expand' + row,
      isHidden: !this.state.isRowOpen[row]
    }, /*#__PURE__*/React.createElement(Level, {
      hasGutter: true
    }, /*#__PURE__*/React.createElement(LevelItem, null, /*#__PURE__*/React.createElement("span", null)), /*#__PURE__*/React.createElement(LevelItem, {
      id: 'shared-with-user-message-' + row
    }, this.sharedWithUsersMessage(row)), /*#__PURE__*/React.createElement(LevelItem, null, /*#__PURE__*/React.createElement("span", null)))))));
  }

}

_defineProperty(ResourcesTable, "contextType", AccountServiceContext);
//# sourceMappingURL=ResourcesTable.js.map