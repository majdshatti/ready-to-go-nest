import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { QueryFilterDto } from '..';

/**
 * Gets all filter and non-filter queries and make possible transformations on it
 *
 * @param data any data could be passed to the costum decorator
 * @param ctx ExecutionContext
 *
 * @returns Query Object
 */
export const FilterDecorator = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): QueryFilterDto => {
    const queries = ctx.switchToHttp().getRequest().query;
    let transformedQueries: QueryFilterDto = {};
    let filterSubObject = {}; // filter: { filterSubObject: {} }

    for (const query in queries) {
      if (query === 'sortBy' && !transformedQueries.sortBy) {
        //** Transform sortBy to Tuple **/

        const sortBy: string[] = queries['sortBy'].split(':');
        transformedQueries['sortBy'] = [[sortBy[0], sortBy[1]]];
      } else if (query.includes('.')) {
        //** Transform filter to Object **/

        // Split `filter.user.username`
        // take filter as filterString and user.username as key
        const [filterString, ...key] = query.split('.');
        const keyString = key.join('.');

        if (filterString !== 'filter') continue;

        // Set value to the key
        filterSubObject[keyString] = queries[query];
        // Assign the sub object to example
        transformedQueries[filterString] = filterSubObject;
      } else {
        // Parse int for the values limit and page
        if (query === 'limit' || query === 'page') {
          const int = parseInt(queries[query]);
          if (int && int > 0) {
            transformedQueries[query] = parseInt(queries[query]);
          }
        } else {
          transformedQueries[query] = queries[query];
        }
      }
    }

    return transformedQueries;
  },
);
