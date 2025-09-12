export type GuardOptions = {
  /** Container to observe; defaults to `document.body` */
  root?: ParentNode;
  /** Optional callback fired when tampering is detected */
  onTamper?: () => void;
};

export type GuardReturn = {
  /** Stop observing and disable protection */
  disconnect: () => void;
  /** Update the parent node where the element should be re-attached */
  setOriginalParent: (node: Node) => void;
};
