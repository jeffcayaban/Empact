package com.empact.Empact.payload.TreeData;

import lombok.Data;

import javax.validation.constraints.NotNull;
import java.util.List;

/**
 * The response object that will contain the details required to render a single node on the argument data visualisation
 * on the client-side.
 */

@Data
public class DataNode {

	/** The ID of the argument or petition. **/
	private @NotNull Long contentId;

	/** The list of arguments that are made to the argument or petition. **/
	private List<DataNode> children;

	/** The type of content. (This is either a petition or argument) **/
	private @NotNull String contentType;

	/** Indicates whether the content supports or opposes the parent content. **/
	private Boolean isSupporting;

	/** The label that is to be shown for the data node on the data visualisation **/
	private @NotNull String name;

	/** Specifies the details required to render the node's shape on the data visualisation **/
	private DataNodeShape nodeSvgShape;
}
