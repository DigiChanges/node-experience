<#macro kw component="button" rest...>
  <${component}
    class="flex justify-center px-4 py-2 relative rounded-lg text-sm text-white w-full focus:outline-none focus:ring-2"
    style="width: 315px; width: 315px;background-color:#6e3a4b;"
    <#list rest as attrName, attrValue>
      ${attrName}="${attrValue}"
    </#list>
  >
    <#nested>
  </${component}>
</#macro>
