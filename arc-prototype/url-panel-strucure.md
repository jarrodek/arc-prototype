# The URL panel architectural overview

```
| - url-panel
|   - url-input
|   - url-parameters-editor
|   - api-search-panel
|   - api-listing-panel
|     - history-list
|     - saved-list
|     - raml-projects-list
|     - discovery-data-list
|     - exchange-data-list
|   - url-suggestions-panel
|     - domain-suggestions
|     - path-suggestions
|     - query-suggestions
```

## `<url-panel>`
A component responsible for overall url / saved data query logic.

## `<url-input>`
Displays URL input field. URLs restored from RAML projects and containing path and query parameters will have this parameters highlighted.

Focusing on the field will trigger different actions depending on a context:
* opens history panel if the field is empty
* opens `<url-parameters-editor>` when URL contains parameters
* opens a history panel if the URL do not contain parameters

The `<url-input>` recognizes if the data provided by the user is an URL or is a query. It sends signal to inform parent element (the controller) to search for matched URL (query) in saved data.

Logic supporting focus is placed in `<url-panel>` component. `<url-input>` is only responsible for displaying and entering the URL or query.

## `<url-parameters-editor>`
Component responsible for displaying parameters form with documentation (if available). If the URL contains path or query parameters and user focuses on the URL the panel will show itself.

Editing parameters will automatically update the `<url-input>` with values from the form.

If documentation for the parameters is available then it will be displayed with the fields.


## `<api-listing-panel>`
Component that holds logic for displaying saved data (local or external data).
Depending on user input it shows different data panels:
* `<history-list>` - list of requests made by the user in a past
* `<saved-list>` - list of request saved by the user as a single request
* `<raml-projects-list>` - list of saved / added RAML definitions
* `<discovery-data-list>` - list of RAML projects found for user query in ARC's discovery service
* `<exchange-data-list>` - list of RAML projects found for user query in a Anypoint Exchange service.

## `<url-suggestions-panel>`
Component responsible for logic for displaying an URL suggestions. It performs a query in all available data sources and displays suggestions depending on a suggestions state:

* For many URLs from different domain it shows `<domain-suggestions>`
* For URLs from one domain with many different paths or when the domain has been selected by the user (and there is many paths) it shows `<path-suggestions>`. The domain part is visible in the element but focus is on
the path part of the URL.
* If path and domain is selected (or there is no more candidates) the `<query-suggestions>` panel is displayed. It shows full URL of the endpoint but focus is on the query part.
