module Jekyll
  module HeadingShiftFilter
    # Shifts <h1>-<h5> tags up by `offset` levels, capped at h6. Needed
    # because kramdown bakes heading levels into post.content once, but the
    # same post renders at different depths standalone vs. in a trip feed.
    def shift_headings(html, offset)
      offset = offset.to_i
      return html if offset.zero? || html.nil?

      5.downto(1) do |level|
        new_level = [level + offset, 6].min
        html = html.gsub(/<h#{level}(\s|>)/, "<h#{new_level}\\1")
        html = html.gsub(/<\/h#{level}>/, "</h#{new_level}>")
      end
      html
    end
  end
end

Liquid::Template.register_filter(Jekyll::HeadingShiftFilter)
