---
layout: unity_tip
title: SerializedEditorWindow
description: Base Class for editor windows in Unity3d
image: /assets/images/serialized-editor-window.jpg
date: 2019-03-25
---

Base class for Editor windows to make it easier to draw PropertyFields.

The Class Sets up a SerializedObject for the editor window and makes sure that it updates the Unity Object.

<img src="{{ '/assets/images/serialized-editor-window.jpg' | relative_url }}" class="img-responsive rounded-image full-shadow" width="100%" alt="Images of SerializedEditorWindow script"> 
<details>
  <summary class="bold-summary">Full Script (Click Me)
  </summary>

  <script src="https://gist.github.com/James-Frowen/48c2ef79d4868247fce8b235a659284c.js"></script>
</details>


## Example Use
```csharp
public class RagDollHelperWindow : SerializedEditorWindow
{
    public RagDollHelper ragDollHelper;

    protected override void drawGUI()
    {
        this.propertyField("ragDollHelper");
        if (this.button("Sync Objects"))
        {
            this.ragDollHelper.StartSync();
        }
    }

    [MenuItem("Window/Rag Doll Helper")]
    public static void ShowWindow()
    {
        showWindow<RagDollHelperWindow>();
    }
}
```