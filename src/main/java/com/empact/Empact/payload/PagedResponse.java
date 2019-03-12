package com.empact.Empact.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.util.List;

/**
 * The response object that contains the page of content. It carries pagination properties that is used to display
 * content on a table from the client-side.
 *
 * @param <T> Commonly used for arguments and petitions.
 */

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PagedResponse<T> {

	/** The list of arguments of petitions. **/
	private @NotNull List<T> content;

	/** The page number. **/
	private @NotNull int page;

	/** The page size. **/
	private @NotNull int size;

	/** The total number of arguments or petitions. **/
	private @NotNull long totalElements;

	/** The total number of pages that can be accessed. **/
	private @NotNull int totalPages;

	/** Indicates whether list of arguments or petitions are the last page to be fetched. **/
	private boolean last;

}
