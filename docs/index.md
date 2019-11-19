---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: default
---
<meta charset="utf-8">
<title>iiif-annotation library Homepage</title>

# IIIF-Annotation Library

This library provides a number of options. Examples of these options can be seen in the pages below.

The **[Tag Builder]({{site.baseurl}}/tag-builder/)** provides a user interface for creating these views and also provides a number of examples of each view.

[Dist files]({{site.baseurl}}/dist)

1. [iiif-annotation image viewer]({{site.baseurl}}/imageviewer)
  - This will take an IIIF annotation or IIIF annotation list and render the image, annotation, full image, and a link to the full object.
  - This functionality is customizable, please see page for details

2. [iiif-annotation storyboard]({{site.baseurl}}/storyboard)
  - This will take an IIIF annotation list and render the image in an OpenSeadragon container. It allows the user to navigate through the annotations and the areas annotated with arrow buttons, it also allows for the areas to be highlighted with a toggle button. Lastly, these annotations can be viewed with an auto run button.
  - This functionality is customizable, please see page for details.

3. [iiif-annotation multi storyboard]({{site.baseurl}}/multistoryboard)
    - This will take an IIIF multiple annotations and render the image in an OpenSeadragon container. It allows the user to navigate through the annotations and the areas annotated with arrow buttons, it also allows for the areas to be highlighted with a toggle button. Lastly, these annotations can be viewed with an auto run button.
    - This functionality is customizable, please see page for details.

3. [iiif-annotation range storyboard]({{site.baseurl}}/range)
    - This will take an range list of annotations and render the annotations in paged viewer of storyboards.
    - This functionality is customizable, please see page for details.
